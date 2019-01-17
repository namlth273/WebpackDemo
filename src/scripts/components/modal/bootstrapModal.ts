export class IModalOption {
    backdrop: boolean;
    keyboard: boolean;
    duration: number;
    isActive: KnockoutObservable<boolean> ;
    content? : string;
}

export interface IModal {
    open(): void;
    close(): void;
}

export class ModalOption implements IModalOption {
    backdrop: boolean = true;
    keyboard: boolean = true;
    duration: number = 100;
    content? : string;
    isActive: KnockoutObservable<boolean>;
}

export class Modal implements IModal {
    private timer: number = 0;
    private overlay: Element;
    private isInitialized: boolean = false;
    
    constructor(private modal: Element, private options : IModalOption) {
        var that = this;
        if (that.options.isActive()) {
            that._init();
            this.isInitialized = true;
        }
    }

    open(): void {
        var that = this;
        if (!this.isInitialized) {
			that._init();
		}
		that._open();
    };

    close(): void {
        var that = this;
		that._close();
    };

    private _init(): void {
        var that = this;
		if (that.options.content && typeof that.options.content !== "undefined") {
			that._setContent(that.options.content);
		}
		that._dismiss();
		that._keydown();
		that._trigger();
		// if (!(that.isIE && ththatis.ieVersion < 9)) { 
		// 	that.resize(); 
		// }
	}

    private _open(): void {
        var that = this;

        if (that.options.backdrop) {
            that._createOverlay();
        } else {
            that.overlay = null;
        }

        document.body.classList.add("modal-open");
        that.modal.classList.add("show");

        clearTimeout(parseInt(that.modal.getAttribute("data-timer")));
        that.timer = window.setTimeout(() => {
            if (that.overlay !== null) {
                //that._resize();
                that.overlay.classList.add("in");
            }
            that.modal.classList.add("in");
            that.modal.classList.add("d-block");
            that.modal.classList.add("fadeIn");
            that.modal.classList.add("animated");
            that.modal.setAttribute("aria-hidden", "false");
        }, that.options.duration / 2);

        that.modal.setAttribute("data-timer", that.timer.toString());
        that.options.isActive(true);
        console.log("trigger _open");
    }

    private _close(): void {
        var that = this;

        that.modal.classList.remove("d-block");
        that.modal.classList.remove("in");
        that.modal.setAttribute("aria-hidden", "true");

        if (that.overlay) {
            that.overlay.classList.remove("in");
        }

        document.body.classList.remove("modal-open");

        clearTimeout(parseInt(that.modal.getAttribute("data-timer")));
        that.timer = window.setTimeout(() => {
            that.modal.classList.remove("show");
            that._removeOverlay();
        }, that.options.duration / 2);

        that.modal.setAttribute("data-timer", that.timer.toString());
        that.options.isActive(false);
        console.log("trigger _close");
    }

    private _setContent(content: string): void {
        var that = this;
        (<HTMLElement> that.modal.querySelector(".modal-content")).innerHTML = content;
        console.log("trigger _setContent");
    }

    private _createOverlay(): void {
        var that = this;
        //var backdropWrapper = document.createElement("div"),
        var backdrop = document.getElementsByClassName("modal-backdrop")[0],
            overlay = document.querySelector(".modal-backdrop");

        if (backdrop.classList.contains("d-none"))
            backdrop.classList.remove("d-none");

        backdrop.setAttribute("class", "modal-backdrop fade show");
        //backdropWrapper.setAttribute("data-bind", "if: !isMobile()");
        //backdropWrapper.appendChild(backdrop);

        if (overlay) {
            that.overlay = overlay;
        } else {
            that.overlay = backdrop;
            // document.body.appendChild(backdrop);
        }
        console.log("trigger _createOverlay");
    }

    private _removeOverlay(): void {
        var overlay = document.querySelector(".modal-backdrop");
        if (overlay !== null && typeof overlay !== "undefined") {
            //document.body.removeChild(overlay)
            if (!overlay.classList.contains("d-none"))
                overlay.classList.add("d-none");
        }
        console.log("trigger _removeOverlay");
    }

    private _keydown(): void {
        var that = this;
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (that.options.keyboard && event.which == 27) {
                that.close();
            }
        }, false);
        console.log("trigger _keydown");
    }

    private _trigger(): void {
        var that = this;
        var triggers = document.querySelectorAll("[data-toggle=\"modal\"]"),
            tgl = triggers.length,
            i = 0;
        for (i; i <tgl; i++) {
            triggers[i].addEventListener("click", (event: Event) => {
                var b = <HTMLElement> event.target,
                    s = b.getAttribute("data-target") && b.getAttribute("data-target").replace("#", "") ||
                    b.getAttribute("href") && b.getAttribute("href").replace("#", "");
                if (document.getElementById(s) === that.modal) {
                    that.open();
                }
            })
        }
        console.log("trigger _trigger");
    }

    private _resize(): void {
        var that = this;
        let overlay: HTMLElement = <HTMLElement> (that.overlay || document.querySelector(".modal-backdrop")),
            dim = {
                w: document.documentElement.clientWidth + "px",
                h: document.documentElement.clientHeight + "px"
            };
        setTimeout(function () {
            if (overlay !== null && /in/.test(overlay.className)) {
                overlay.style.height = dim.h;
                overlay.style.width = dim.w;
            }
        }, that.options.duration / 2);
    }

    private _dismiss(): void {
        var that = this;
        that.modal.addEventListener("click", (e: Event) => {
            let target = <Element> e.target;
            if (( <HTMLElement> target.parentNode).getAttribute("data-dismiss") === "modal" || target.getAttribute("data-dismiss") === "modal" || e.target === that.modal) {
                e.preventDefault();
                that.close();
            }
        });
        console.log("trigger _dismiss");
    }
}