class UserDataCollection {
  constructor() {
    this.dataOnUser = [];
    this.init();
  }

  async init() {
    await requestGeolocation(this);
    requestMediaAccess(this);
    getIPData(this);
    getLanguage(this);
    getLanguageList(this);
    getOperatingSystem(this);
    getReferrer(this);
    getVisitTime(this);
    getScreenResolution(this);
    getCookies(this);
    getMethod(this);
    getRequestPath(this);
    getRequestParameters(this);
    getUserAgent(this);
    getDeviceType(this);
    getBatteryLevel(this);
    getDeviceMemory(this);
    getTimezone(this);
    getOnlineStatus(this);
    console.log(this.dataOnUser);
  }
}

async function requestGeolocation(instance) {
  if (navigator.geolocation) {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      instance.dataOnUser.push(`Location: Latitude- ${latitude} Longitude- ${longitude}`);
    } catch (error) {
      handleGeolocationError(error, instance);
    }
  } else {
    instance.dataOnUser.push("Location: Geolocation is not supported by this browser.");
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function handleGeolocationError(error, instance) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      instance.dataOnUser.push("Location: User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      instance.dataOnUser.push("Location: Location information is unavailable.");
      break;
    case error.TIMEOUT:
      instance.dataOnUser.push("Location: The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      instance.dataOnUser.push("Location: An unknown error occurred.");
      break;
  }
}

function requestMediaAccess(instance) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((localMediaStream) => {
      const video = document.querySelector("video");
      if (video) {
        video.srcObject = localMediaStream;
        video.onloadedmetadata = () => {
          // Optional: do something with the video here.
        };
      }
    })
    .catch((err) => {
      if (err.name === "NotAllowedError") {
        instance.dataOnUser.push("Error: Camera or microphone access was denied.");
      }
    });
}

async function getIPData(instance) {
  const response = await fetch("http://ip-api.com/json");
  const data = await response.json();
  instance.dataOnUser.push(`IP Data: ${JSON.stringify(data)}`);
}

function getLanguage(instance) {
  instance.dataOnUser.push(`Language: ${navigator.language}`);
}

function getLanguageList(instance) {
  instance.dataOnUser.push(`Preferred Languages List: ${navigator.languages}`);
}

function getOperatingSystem(instance) {
  instance.dataOnUser.push(`Operating System: ${navigator.appVersion}`);
}

function getReferrer(instance) {
  const referrer = document.referrer || "No Referrer";
  instance.dataOnUser.push(`Referring Website: ${referrer}`);
}

function getVisitTime(instance) {
  instance.dataOnUser.push(`Visit Time: ${new Date()}`);
}

function getScreenResolution(instance) {
  const screenResolution = `${screen.width}x${screen.height}`;
  instance.dataOnUser.push(`Screen Resolution: ${screenResolution}`);
}

function getCookies(instance) {
  const cookiesEnabled = navigator.cookieEnabled;
  const cookies = document.cookie || "No Cookies";
  instance.dataOnUser.push(`Cookies Enabled?: ${cookiesEnabled}`, `Cookies: ${cookies}`);
}

function getMethod(instance) {
  instance.dataOnUser.push("Method: GET");
}

function getRequestPath(instance) {
  instance.dataOnUser.push(`Request Path: ${window.location.pathname}`);
}

function getRequestParameters(instance) {
  const parameters = window.location.search || "No Parameters";
  instance.dataOnUser.push(`Request Parameters: ${parameters}`);
}

function getUserAgent(instance) {
  instance.dataOnUser.push(`User Agent: ${navigator.userAgent}`);
}

function getDeviceType(instance) {
  const deviceType = /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  instance.dataOnUser.push(`Device Type: ${deviceType}`);
}

async function getBatteryLevel(instance) {
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    const batteryLevel = `${battery.level * 100}%`;
    instance.dataOnUser.push(`Battery Level: ${batteryLevel}`);
  } else if (navigator.battery) {
    const batteryLevel = `${navigator.battery.level * 100}%`;
    instance.dataOnUser.push(`Battery Level: ${batteryLevel}`);
  }
}

function getDeviceMemory(instance) {
  const memory = navigator.deviceMemory || "Memory information is not available in this browser.";
  instance.dataOnUser.push(`Device Memory: ${memory}GB`);
}

function getTimezone(instance) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  instance.dataOnUser.push(`Timezone: ${timezone}`);
}

function getOnlineStatus(instance) {
  const onlineStatus = window.navigator.onLine ? "Online" : "Offline";
  instance.dataOnUser.push(`Online Status: ${onlineStatus}`);
}

export { UserDataCollector };
