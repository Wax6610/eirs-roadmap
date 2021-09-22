import { CheckResultDto } from "./check-result-dto";

export interface RequestSuccessResult {
  created: string[];
  checkFailedList: CheckResultDto[];
}
