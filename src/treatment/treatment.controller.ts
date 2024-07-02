import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { Treatment } from './treatment.entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tratamientos')
@Controller('treatments')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  create(@Body() createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    return this.treatmentService.create(createTreatmentDto);
  }

  @Get()
  findAll(): Promise<Treatment[]> {
    return this.treatmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Treatment> {
    return this.treatmentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatment> {
    return this.treatmentService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.treatmentService.remove(id);
  }
}
