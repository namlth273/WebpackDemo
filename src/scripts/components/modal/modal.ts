import { ModalOption, IModal, Modal } from "./bootstrapModal";

interface IParam {
    isModalActive: KnockoutObservable<boolean>;
    modalId: KnockoutObservable<string>;
}

class ModalViewModel {
    modalId: KnockoutObservable<string> = ko.observable(undefined);
    modal: KnockoutObservable<IModal> = ko.observable(undefined);
    option = new ModalOption();

    constructor(params: IParam) {
        var that = this;

        that.modalId = params.modalId;
        that.option.isActive = params.isModalActive;
        that.modal(new Modal(document.getElementById(that.modalId()), that.option));

        if (params.isModalActive()) {
            that.modal().open();
        }

        params.isModalActive.subscribe((newValue) => {
            if (newValue) {
                that.modal().open();
            }
        });
    }
}

export class ModalComponent {
    constructor() {
        return {
            viewModel: ModalViewModel,
            template: "<div></div>"
        };
    }
}