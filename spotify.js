const spotify = {
    refreshToken: "AQC_DRNOV78a8JjA4IdhVK9Yv6QfxeAueIf11gHETXJ8wzYToGdQsg9S65Dpvh_C8d6jmj0ncGl-bwoNsV_jMKsVVx_waJQW0qhKDEeNG7PwCMrFGp1lFS2EWuxgj_PEWaI",
    accessToken: "",
    tokenAccessed: Date.now() - 10000,
    dataReceived: Date.now() - 10000,
}

const getAccessToken = () => {
    if (spotify.refreshToken < 120) {
        throw new "No refresh token found."
    }

    else if (Date.now() - spotify.tokenAccessed > 10000) {
        spotify.tokenAccessed = Date.now()

        const request = new XMLHttpRequest()
        request.open('GET', "https://spotify-visualiser.vercel.app/api/refresh?refresh_token=" + spotify.refreshToken, true)
        request.send()
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                const response = JSON.parse(request.responseText)

                if (response.access_token) {
                    spotify.accessToken = response.access_token
                }

                else if (response.error) {
                    throw new `Error: ${response.error}`
                }
            }
        }
    }
}