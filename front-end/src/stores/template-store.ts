import { action, decorate, observable } from "mobx";
import RequestState from "../types/request-state";
import { SocketService } from "../services/socket-service";
import { Template } from "../components/dialogs/edit-template/types/template";
import { TemplateCodes } from "../components/dialogs/edit-template/template-codes/types/template-codes";

class TemplateStore {
  constructor(private readonly socketService: SocketService) {}
  data: Template[] = [];
  codes: TemplateCodes[] = [];
  isDialogOpen: boolean = false;
  selectedId: number = 0;
  state: RequestState = RequestState.init;

  loadTemplates(data: Template[]) {
    this.data = data;
  }
  loadCodes(data: TemplateCodes[]) {
    this.codes = data;
  }

  getTemplateById(id: number): Template | undefined {
    return this.data.find((v) => v.id === id);
  }

  saveTemplate(data: any): void {
    this.state = RequestState.request;
    this.socketService.saveTemplate(data);
  }

  updateTemplateAfterSave(data: Template) {
    const index = this.data.findIndex((v) => v.id === data.id);
    if (index !== -1) {
      this.data[index] = data;
    }
  }

  openDialog(templateId: number) {
    if (!Number.isInteger(templateId)) return;
    this.selectedId = templateId;
    this.isDialogOpen = true;
  }
  closeDialog() {
    this.isDialogOpen = false;
    this.selectedId = 0;
    this.state = RequestState.init;
  }

  saveError() {
    this.state = RequestState.failed;
  }
}
decorate(TemplateStore, {
  data: observable, // Список шаблонов
  codes: observable, //Спиисок кодов шаблонов
  state: observable, // Статус заппроса сохраения шаблона
  selectedId: observable, // ID Шаблона, который будем редактиовать
  isDialogOpen: observable, // Признак открытия окна хапроса
  loadTemplates: action, //Обновление списка шаблонов при начальной загрузке
  openDialog: action, // Открыть диалог редактирования запроса
  closeDialog: action, // Закрыть диалог
  updateTemplateAfterSave: action, // Обновление шаблона у клиенток после сохранения
  getTemplateById: action, // Получение шаблона для редактирования
  loadCodes: action, // загрузка кодов
  saveError: action, // Устанавливаем признак ошибки при сохранении
});

export default TemplateStore;
