import apiClient from '../apiClient';

import { DepositDetailsResponse, LedgerParams, LedgerResponse, UpdateLedgerDeposit, UpdateLedgerWithdraw, WithdrawDetailsResponse } from '#/entity';

const enum LedgerApi {
  getAllLedgers = '/admin/auth/approved-transactions',
  updateLedgerDepositRequest = '/user/update-deposit-request',
  updateLedgerWithdrawRequest = '/user/update-withdraw-request',
}

const GetAllLedgers = async (ledgerParams: LedgerParams) => {
  const { type, page, page_size: pageSize, month, status,search } = ledgerParams;

  // Build params dynamically, excluding undefined values
  const params: any = {};
  if (type) params.transaction_type = type;
  if (page !== undefined) params.page = page;
  if (pageSize !== undefined) params.page_size = pageSize;
  if (month) params.month = month;
  if (status) params.status = status;
  if (search) params.search = search;

  return apiClient.get<LedgerResponse>({
    url: LedgerApi.getAllLedgers,
    params,
  });
};

// Update deposit request
const UpdateLedgerDepositRequest = async (data: UpdateLedgerDeposit) => {
  return apiClient.post<DepositDetailsResponse>({
    url: LedgerApi.updateLedgerDepositRequest,
    data,
  });
};

// Update withdrawal request
const UpdateLedgerWithdrawRequest = async (data: UpdateLedgerWithdraw) => {
  return apiClient.post<WithdrawDetailsResponse>({
    url: LedgerApi.updateLedgerWithdrawRequest,
    data,
  });
};

export { GetAllLedgers, UpdateLedgerDepositRequest, UpdateLedgerWithdrawRequest };
