﻿

define(function (require) {

    var ViewModel = function (moduleContext) {

        var self = this;
        var pluginName = "";

        this.isShow = ko.observable(false);
        this.confirmRemoveTitle = ko.observable("");
        this.confirmRemoveMessage = ko.observable("");
        this.holder= null;

        this.initialize = function (element, description, name, holder) {
            pluginName = name;
            self.holder = holder;
            var offset = holder.hasClass("wide") ? -105 : -35;
            var helpButton = element.find('.menu-help');
            var tip = new Opentip(helpButton, description, { showOn: "click", fixed: true, tipJoint: "top", offset: [offset, 0], stemLength: 0, borderRadius: 0, background: "#fff", borderColor: "#000", borderWidth: 2, targetJoint: "bottom middle" });
        }        
        
        this.close = function () {
            console.log("Close Called");
            moduleContext.notify("MESSAGE_BOX", {
                title: "Remove '" + pluginName + "' widget?",
                body: "Are you sure you want to remove '" + pluginName + "' widget from the dashboard?",
                callback: self.confirmClose
            })
            return false
        }

        this.confirmClose = function () {
            if (self.holder)
                self.holder.fadeOut(1000, function () {
                    if (typeof (Storage) !== "undefined") {
                        var plugins = JSON.parse(localStorage.userPlugins);
                        var index = plugins.indexOf(self.holder.data("path"));
                        plugins.splice(index, 1);
                        localStorage.userPlugins = JSON.stringify(plugins);
                    }

                    self.holder.remove();
                })
        }

        this.help = function () {
            return false
        }

        this.show = function () {
            self.isShow(true);
        }

        this.hide = function () {
            self.isShow(false);
        }

    }   
  

    return ViewModel;

});