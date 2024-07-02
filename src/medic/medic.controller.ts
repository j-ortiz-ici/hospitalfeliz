import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicService } from './medic.service';
import { Medic } from './medic.entity';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medicos')
@Controller('medics')
export class MedicController {
  constructor(private readonly medicService: MedicService) {}

  @Post()
  create(@Body() createMedicDto: CreateMedicDto): Promise<Medic> {
    return this.medicService.create(createMedicDto);
  }

  @Get()
  findAll(): Promise<Medic[]> {
    return this.medicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Medic> {
    return this.medicService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateMedicDto: UpdateMedicDto,
  ): Promise<Medic> {
    return this.medicService.update(id, updateMedicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.medicService.remove(id);
  }
}
