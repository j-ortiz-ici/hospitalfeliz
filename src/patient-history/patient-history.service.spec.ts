import { Test, TestingModule } from '@nestjs/testing';
import { PatientHistoryService } from './patient-history.service';

describe('PatientHistoryService', () => {
  let service: PatientHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientHistoryService],
    }).compile();

    service = module.get<PatientHistoryService>(PatientHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
