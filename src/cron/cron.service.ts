import * as path from 'node:path';
import * as fs from 'node:fs';
import { createGunzip } from 'node:zlib';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CHALLENGE_API_TOKEN } from 'src/constants';

@Injectable()
class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @Inject(CHALLENGE_API_TOKEN)
    private readonly httpRef: Axios.AxiosInstance,
  ) {}

  createTmpDir(): string {
    const tmpDir = this.getTmpDir();
    this.clearTmpDir();
    return tmpDir;
  }

  clearTmpDir() {
    const tmpDir = this.getTmpDir();

    fs.readdirSync(tmpDir).forEach((file) =>
      fs.unlinkSync(path.join(tmpDir, file)),
    );
  }

  private getTmpDir(): string {
    const tmpDir = path.join(__dirname, '..', '..', '..', 'tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    return tmpDir;
  }

  async getJsonFilePaths(taskDownloads: string[]): Promise<string[]> {
    const results = await Promise.allSettled(taskDownloads);

    return results
      .filter((res) => res.status === 'fulfilled')
      .map((res) => (res as PromiseFulfilledResult<string>).value);
  }

  async processFiles(filePaths: string[]): Promise<any[]> {
    const tasks = filePaths.map(this.processLargeJson.bind(this));
    const results = await Promise.allSettled(tasks);
    const products = results
      .filter((res) => res.status === 'fulfilled')
      .flatMap((res) => (res as PromiseFulfilledResult<any[]>).value);

    return this.sanitizeProducts(products);
  }

  async processLargeJson(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
      let lines: string[] = [];
      let buffer = '';

      readStream.on('data', (chunk: string) => {
        buffer += chunk.replace(/[;\r]/g, '').replaceAll(/\\"/g, '');
        const splitLines = buffer.split('\n');

        buffer = splitLines.pop() as string;
        lines = lines.concat(splitLines);

        if (lines.length >= 100) {
          readStream.destroy();
          lines = lines.slice(0, 100);
        }
      });

      readStream.on('close', () => {
        resolve(lines);
      });

      readStream.on('error', (err) => {
        reject(`Error reading file: ${err}`);
      });
    });
  }

  /*
   * Retorna lista de arquivos disponíveis para download
   */
  async fetchFilesList(): Promise<string[]> {
    return ['products_01.json.gz'];
    // const { data } = await this.httpRef.get('/index.txt');
    // if (!data) throw new Error('Error getting files');
    //
    // return data.toString().trim().split('\n').filter(Boolean);
  }

  async downloadAndSaveFile(file: string, tmpDir: string): Promise<string> {
    const filePath = path.join(tmpDir, file);
    try {
      const response = await this.httpRef.get(`/${file}`, {
        responseType: 'stream',
      });

      const data = response.data as NodeJS.ReadableStream;
      await this.saveToFile(data, filePath);
      return await this.unzipFile(filePath);
    } catch (error) {
      console.error(`Error downloading ${file}:`, error);
      return '';
    }
  }

  private async saveToFile(
    stream: NodeJS.ReadableStream,
    filePath: string,
  ): Promise<void> {
    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      stream.pipe(writer).on('finish', resolve).on('error', reject);
    });
  }

  async unzipFile(filePath: string): Promise<string> {
    const outputPath = filePath.replace('.gz', '');

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(createGunzip())
        .pipe(fs.createWriteStream(outputPath))
        .on('finish', () => {
          fs.unlinkSync(filePath);
          resolve(outputPath);
        })
        .on('error', reject);
    });
  }

  sanitizeProducts(productsRaw: string[]) {
    const products = [];
    const sanitizeRaw = productsRaw.map((product) => JSON.parse(product));

    for (const product of sanitizeRaw) {
      products.push({
        code: product.code,
        status: 'published',
        imported_t: new Date(),
        productName: product.product_name,
        quantity: product.quantity,
        brands: product.brands,
        categories: product.categories,
        labels: product.labels,
        ingredients: product.ingredients_text,
        servingSize: product.serving_size,
        servingQuantity: product.serving_quantity,
        nutriscoreScore: product.nutriscore_score,
        nutriscoreGrade: product.nutriscore_grade,
        mainCategory: product.main_category,
        imageUrl: product.image_url,
      });
    }

    return products;
  }
}

export { CronService };
