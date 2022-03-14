import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tarefaCollection: any[] = [];
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private tarefaService: TarefaService) { }

  ionViewDidEnter() {
    this.listarTarefa();
  }
  listarTarefa() {
    this.tarefaCollection = this.tarefaService.listar();

  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.salvar(tarefa, () => (this.listarTarefa));
          }
        }
      ]
    });
    await alert.present();
  }

  delete(item) {
    this.tarefaService.delete(item, () => {
      this.listarTarefa();
    });
  }

  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O QUE DESEJA FAZER?",
      buttons: [{
        text: tarefa.feito ? 'Desmarcar' : 'Marcar',
        icon: tarefa.feito ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          tarefa.feito = !tarefa.feito;
          this.tarefaService.atualizar(tarefa, () => {
            this.listarTarefa();
          })
        }
      }]
    })


  }

}
