var nameField = document.getElementById('input')
const nameSubmit = document.getElementById('btn')

const postLocation = (name, pos) => {
    axios.post('http://localhost:5000/postlocation', {
            name,
            pos,
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}
var position;

function initMap() {
    let name = nameField.value
    let options = {
        zoom: 8,
        center: {
            lat: 37.532600,
            lng: 127.024612,
        }
    }
    var map = new google.maps.Map(document.getElementById('map'), options)
    let info = new google.maps.InfoWindow();
    var btn = document.createElement('button')
    btn.textContent = "Others location"
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(btn);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);
            position = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
            getLocation(map)

            console.log(position)
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {
                    lat: position.lat,
                    lng: position.lon,
                }
            })
            info.setContent("your location")
            info.open(map)

        })
    } else {
        console.log("err")
    }
    nameSubmit.onclick = (e) => {
        e.preventDefault()
        postLocation(nameField.value, position)
        getLocation(map)

    }

}

function getLocation(map) {
    axios.get('http://localhost:5000/getlocation')
        .then((res) => {
            console.log(res)
            if (res.data) {
                res.data.map(item => {
                    addMarker(item.lan, item.lon, item.name, map)
                })
            }

        })
        .catch((err) => {
            console.log(err)
            throw err
        })
}
const addMarker = (lat, lon, name, map) => {
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
        title: name
    })
    marker["infowindow"] = new google.maps.InfoWindow({
        content: name
    })
    google.maps.event.addListener(market, 'mouseover', () => {
        this['infowindow'].open(map, this)
    })
}