import { HttpResponseHelper } from '@app/_shared/helpers/http-response.helper';
import { HttpResponse } from '@domain/contracts/presentation-layer/types';
import { UniqueIdentifier } from '@domain/types';
import {
  GetTransfer,
  ListTransfer,
  UpdateTransfer,
} from '@domain/use-cases/transfer';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetTransferByExternalTransferId } from '../../domain/use-cases/transfer/get-transfer-by-external-transfer-id.use-case';
import { GetTransferOutputDto } from './dtos/get-transfer.dto';
import { GetTransferByExternalTransferIdOutputDto } from './dtos/get-transfer-by-external-transfer-id.dto';
import { ListFilterDto, ListTransferOutputDto } from './dtos/list-transfer.dto';
import {
  UpdateTransferInputDto,
  UpdateTransferOutputDto,
} from './dtos/update-transfer.dto';

@Controller('transfers')
@ApiTags('transfers')
export class TransferController {
  constructor(
    private readonly getTransferUseCase: GetTransfer,
    private readonly listTransferUseCase: ListTransfer,
    private readonly updateTransferUseCase: UpdateTransfer,
    private readonly getTransferByExternalTransferIdUseCase: GetTransferByExternalTransferId,
  ) {}
  @ApiResponse({
    description: 'Get transfers for accountId',
    status: HttpStatus.OK,
    type: ListTransferOutputDto,
  })
  @Get(':accountId/list')
  async getMovementList(
    @Param('accountId') accountId: UniqueIdentifier,
    @Query() filter: ListFilterDto,
    @Res() res: Response,
  ): Promise<HttpResponse<ListTransferOutputDto>> {
    const result = this.listTransferUseCase.execute({ accountId, filter });

    return HttpResponseHelper.use(res)
      .makeSimpleHttpResponseTo(result)
      .onSuccessDefineStatusAs(HttpStatus.OK)
      .onSuccessDefineMessageAs('transfers retrieved')
      .onErrorDefineStatusAs(HttpStatus.BAD_REQUEST)
      .build();
  }
  @ApiResponse({
    description: 'Get a transfer',
    status: HttpStatus.OK,
    type: GetTransferOutputDto,
  })
  @Get(':transferId')
  async getTransfer(
    @Param('transferId') transferId: UniqueIdentifier,
    @Res() res: Response,
  ): Promise<HttpResponse<GetTransferOutputDto>> {
    const result = this.getTransferUseCase.execute({ transferId });

    return HttpResponseHelper.use(res)
      .makeSimpleHttpResponseTo(result)
      .onSuccessDefineStatusAs(HttpStatus.OK)
      .onSuccessDefineMessageAs('Transfer data retrieved')
      .onErrorDefineStatusAs(HttpStatus.BAD_REQUEST)
      .build();
  }
  @ApiResponse({
    description: 'Get a transfer by externalTransferId',
    status: HttpStatus.OK,
    type: GetTransferByExternalTransferIdOutputDto,
  })
  @Get()
  async getTransferByExternalTransferId(
    @Query('externalTransferId') externalTransferId: string,
    @Res() res: Response,
  ): Promise<HttpResponse<GetTransferByExternalTransferIdOutputDto>> {
    const result = this.getTransferByExternalTransferIdUseCase.execute({
      externalTransferId,
    });

    return HttpResponseHelper.use(res)
      .makeSimpleHttpResponseTo(result)
      .onSuccessDefineStatusAs(HttpStatus.OK)
      .onSuccessDefineMessageAs('Transfer data retrieved')
      .onErrorDefineStatusAs(HttpStatus.BAD_REQUEST)
      .build();
  }
  
  @ApiResponse({
    description: 'Update an transfer',
    status: HttpStatus.OK,
    type: UpdateTransferOutputDto,
  })
  @Put()
  async updateTransfer(
    @Body() input: UpdateTransferInputDto,
    @Res() res: Response,
  ): Promise<HttpResponse<UpdateTransferOutputDto>> {
    const result = this.updateTransferUseCase.execute(input);

    return HttpResponseHelper.use(res)
      .makeSimpleHttpResponseTo(result)
      .onSuccessDefineStatusAs(HttpStatus.OK)
      .onSuccessDefineMessageAs('Transfer updated')
      .onErrorDefineStatusAs(HttpStatus.BAD_REQUEST)
      .build();
  }
}
