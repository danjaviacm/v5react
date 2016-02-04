import request from 'reqwest'
import { BASE_URL } from '../constants/AppConstants'

const url = BASE_URL

class Ux3Services {
    getBrandsByBody(idBody) {
        return request({
            url: `${url}fasecolda/get_brands_from_body/?body_id=${idBody}`,
            type: 'json'
        })
    }

    getModelsByBrand(idBody, idBrand) {
        return request({
            url: `${url}fasecolda/get_years_from_brand/?body_id=${idBody}&brand_id=${idBrand}`,
            type: 'json'
        })
    }

    getLinesByModel(idBody, idBrand, idModel) {
        return request({
            url: `${url}fasecolda/get_references_from_brand_and_year/?body_id=${idBody}&brand_id=${idBrand}&year=${idModel}`,
            type: 'json'
        })
    }

    getReferencesByLine(idBody, idBrand, idModel, idLine) {
        return request({
            url: `${url}fasecolda/get_subreferences_from_brand_and_year/?body_id=${idBody}&brand_id=${idBrand}&year=${idModel}&reference_id=${idLine}`,
            type: 'json'
        })
    }

    getCompleteReferences(idBody, idBrand, idModel, idLine, idReference) {
        return request({
            url: `${url}fasecolda/get_specific_type_car_from_reference/?body_id=${idBody}&brand_id=${idBrand}&year=${idModel}&reference_id=${idLine}&subreference_id=${idReference}`,
            type: 'json'
        })
    }

    getVehiclePriceFromFasecolda ( idModel, fasecoldaCode ) {
        return request({
            url: `${url}fasecolda/get_price_from_fasecolda/?fabrication_year=${idModel}&fasecolda=${fasecoldaCode}`,
            type: 'json'
        })
    }

    // getInfoHidden(query_registration) {
    //     return request({
    //         url: `${url}api/v1/soat-v1/vehicle-total-info-hidden/${query_registration}/`,
    //         type: 'json'
    //     })
    // }

    getInfoHidden(query_registration) {
        return request({
            url: `${url}api/v1/soat-v1/vehicle-total-info/${query_registration}/`,
            type: 'json'
        })
    }

    createOppFinal(data) {
        return request({
            url: url + 'api/v2/opps/new/',
            method: 'post',
            type: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
    }

    getAllPolicies(uuid) {
        return request({
            url: `${url}api/v1/opportunity-policies/?uuid=${uuid}`,
            type: 'json'
        })
    }

    getMonthsprice(option, uuid, code, total) {
        return request({
            url: `${url}usuarios/financiamiento/actualizar-pago-mensual/${uuid}/?differ_months=${option}&insurance_company_code=${code}&price_total=${total}`,
            type: 'json'
        })
    }

    getAgentAvailability() {
        return request({
            url: `${url}clientes/actividades/availability/`,
            type: 'json'
        })
    }

    sendCallmeNow(data) {
        return request({
            url: `${url}api/clientes/actividades/call_me_back/`,
            method: 'post',
            type: 'json',
            data: data
        })
    }

    validatePromocode(promocode) {
        return request({
            url: `${url}api/promo/consulta/`,
            method: 'post',
            type: 'json',
            data: {
                promocode: promocode,
                p: 'CarInsurable'
            }
        })
    }
}

export default new Ux3Services()