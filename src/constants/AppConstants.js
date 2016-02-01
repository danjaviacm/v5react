let ENV = 'dev'
let BASE_URL = 'http://localhost:8000/'
let KEY_PUSHER = '5ad5c09fbf6f2ffe36f6'
let IMG = 'http://segdig1.s3.amazonaws.com'

if ( window.location.host == 'seguros.comparamejor.com' ) {
    ENV = 'prd'
    BASE_URL = 'https://seguros.comparamejor.com/'
    KEY_PUSHER = '3173debe12cb90da0c9f'
    IMG = ''
}


export { BASE_URL, ENV, KEY_PUSHER, IMG }