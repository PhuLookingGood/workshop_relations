import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Get(':id/:name')
  findOne(@Param('id') id: string, @Param('name') name: string) {
    return this.optionsService.findOne(+id, name);
  }

  @Patch(':id/:name')
  update(
    @Param('id') id: string,
    @Param('name') name: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(+id, name, updateOptionDto);
  }

  @Delete(':id/:name')
  remove(@Param('id') id: string, @Param('name') name: string) {
    return this.optionsService.remove(+id, name);
  }
}
