export interface CreateRequestDto {
  callbackContactSm: string;
  initiatorSm: string;
  tplId: string;
  description: string;
  assignmentSm: string;
  assignmentName: string;
  service: string;
  createdBy: string;
  number?: number;
  template: string;
  vsp?: string;
}
