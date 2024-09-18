import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { ProductDto } from './dto/product.dto';

const generateMockProducts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    code: i + 1,
    productName: `Product ${i + 1}`,
    categories: 'Food',
    cities: 'São Paulo, Campinas',
    brands: `Brand ${i + 1}`,
    imageUrl: 'https://example.com/image.jpg',
    status: 'published',
    url: `https://example.com/product${i + 1}`,
    creator: `Creator ${i + 1}`,
    quantity: '100g',
    createdAt: new Date(),
    importedAt: new Date(),
    lastModifiedAt: new Date(),
  }));
};

const mockProductsService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  update: jest.fn().mockResolvedValue(null),
  changeStatus: jest.fn().mockResolvedValue(null),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let mockProducts: Partial<ProductDto>[];

  beforeAll(async () => {
    mockProducts = generateMockProducts(200);

    mockProductsService.findAll.mockImplementation((page = 1, limit = 25) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      return mockProducts.slice(start, end);
    });
    mockProductsService.findOne.mockImplementation((code) =>
      mockProducts.find((product) => product.code === code.code),
    );
    mockProductsService.update.mockImplementation((code, dto) => ({
      ...mockProducts.find((product) => product.code === code),
      ...dto,
    }));
    mockProductsService.changeStatus.mockImplementation((code) => {
      const product = mockProducts.find((p) => p.code === code.code);
      return { ...product, status: 'trash' };
    });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
      .overrideGuard(ApiKeyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
      .overrideGuard(ApiKeyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of 25 products', async () => {
      const products = await controller.findAll();
      expect(products).toHaveLength(25);
    });

    it('should return an array of 100 products', async () => {
      const products = await controller.findAll(1, 100);
      expect(products).toHaveLength(100);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne and return a product with code 1', async () => {
      const result = await controller.findOne({ code: 1 });
      expect(service.findOne).toHaveBeenCalledWith({ code: 1 });
      expect(result).toEqual(mockProducts[0]);
    });

    it('should call service.findOne and get error to return a product with code 999', async () => {
      const result = await controller.findOne({ code: 999 });
      expect(service.findOne).toHaveBeenCalledWith({ code: 999 });
      expect(result).not.toBeDefined();
    });
  });

  describe('update', () => {
    it('should call service.update and return the updated product', async () => {
      const updateProductDto: Partial<ProductDto> = {
        code: 1,
        productName: 'Updated Product',
        categories: 'Updated Category',
        cities: 'São Paulo',
        brands: "Abner's Updated",
        imageUrl: 'https://example.com/image-updated.jpg',
        status: 'updated',
        url: 'https://example.com/updated-product',
        creator: 'John Doe Updated',
        quantity: '200g',
        createdAt: new Date(),
        importedAt: new Date(),
        lastModifiedAt: new Date(),
      };
      const result = await controller.update(1, updateProductDto);
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
      expect(result.productName).toEqual('Updated Product');
    });
  });

  describe('remove', () => {
    it('should call service.changeStatus and return the updated product', async () => {
      const result = await controller.remove({ code: 1 });
      expect(service.changeStatus).toHaveBeenCalledWith({ code: 1 });
      expect(result.status).toEqual('trash');
    });
  });
});
