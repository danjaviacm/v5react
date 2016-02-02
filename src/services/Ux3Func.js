import store from 'store2'
const DATA_OPPORTUNITY = 'data-express'
const dataHistory = {}

class Ux3Func {
    loadData() {
        let data = {}
        if (store.get(DATA_OPPORTUNITY) !== null && store.get(DATA_OPPORTUNITY) !== 'null'){
            let data_string = store.get(DATA_OPPORTUNITY);
            data = JSON.parse(data_string);
        }
        trackJs.console.info("Load Data return: ");
        trackJs.console.info(JSON.stringify(data));
        return data
    }

    saveValue(key, data_will_save) {
        let data_saved = this.loadData()
        if(!data_saved){
            trackJs.console.info("First set Value");
            trackJs.console.info(JSON.stringify(data_saved));
            data_saved = {}
        }
        data_saved[key] = data_will_save;
        try {
            store.set(DATA_OPPORTUNITY, JSON.stringify(data_saved));
        } catch (e) {
            //alert("Para hacer uso de esta Aplicación no debe estar desde una navegación privada.");
            trackJs.console.error(e);
            window.location.assign(
                "https://seguros.comparamejor.com/seguro-vehiculos-cotiza/?utm_source=PrivateBrousingMode"
            )
        }

        trackJs.console.info("Value saved: ");
        trackJs.console.info(JSON.stringify(data_saved));

    }

    getValue(key) {
        let data = this.loadData()
        if(data == undefined){
            return false;
        } else {
            return data[key];
        }
    }

    clear(){
        store.clear()
    }
}

export default new Ux3Func()