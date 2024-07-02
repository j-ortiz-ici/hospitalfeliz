import { Test, TestingModule } from '@nestjs/testing';
import { PatientHistoryController } from './patient-history.controller';

describe('PatientHistoryController', () => {
  let controller: PatientHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientHistoryController],
    }).compile();

    controller = module.get<PatientHistoryController>(PatientHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
