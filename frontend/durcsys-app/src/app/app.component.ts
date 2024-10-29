import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'DURC SYS';


  constructor(
    private primeNgConfig: PrimeNGConfig,
  ) {
  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    this.primeNgConfig.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',
      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',
      dateBefore: 'Data é antes',
      dateAfter: 'Data é depois',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Corresponder a todos',
      matchAny: 'Corresponder a qualquer',
      addRule: 'Adicionar regra',
      removeRule: 'Remover regra',
      accept: 'Sim',
      reject: 'Não',
      choose: 'Escolher',
      upload: 'Upload',
      cancel: 'Cancelar',
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 0,
      today: 'Hoje',
      weekHeader: 'Semana',
      weak: 'Fraco',
      medium: 'Médio',
      strong: 'Forte',
      passwordPrompt: 'Digite uma senha',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado',
      pending: 'Pendente',
      chooseYear: 'Escolher ano',
      chooseMonth: 'Escolher mês',
      chooseDate: 'Escolher data',
      prevDecade: 'Década anterior',
      nextDecade: 'Próxima década',
      prevYear: 'Ano anterior',
      nextYear: 'Próximo ano',
      prevMonth: 'Mês anterior',
      nextMonth: 'Próximo mês',
      prevHour: 'Hora anterior',
      nextHour: 'Próxima hora',
      prevMinute: 'Minuto anterior',
      nextMinute: 'Próximo minuto',
      prevSecond: 'Segundo anterior',
      nextSecond: 'Próximo segundo',
      am: 'AM',
      pm: 'PM',
      searchMessage: 'Procurar',
      selectionMessage: 'Selecionar',
      emptySelectionMessage: 'Nenhum registro selecionado',
      emptySearchMessage: 'Nenhum resultado encontrado',
      // fileSizeTypes?: string[];
      // dayNames?: string[];
      // dayNamesShort?: string[];
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembo',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      dayNamesMin: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab',
      ],
    });
  }

  getColor(message: any) {
    if (message.icon === 'pi pi-info') {
      return "bg-primary";
    }
    if (message.icon === 'pi pi-check') {
      return "bg-green-300";
    }
    if (message.icon === 'pi pi-comments') {
      return "bg-cyan-300";
    }
    if (message.icon === 'pi pi-times') {
      return "bg-red-300";
    }
    if (message.icon === 'pi pi-exclamation-triangle') {
      return "bg-orange-300";
    }
    return "bg-primary";
  }
}
