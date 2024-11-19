const route = (event, forcedPath = null) => {
    event = event || window.event;
    event.preventDefault();

    let path = forcedPath;
    if (!path) {
        let link = event.target.closest('a');
        if (link) {
            path = link.href;
        }
    }

    if (path) {
        window.history.pushState({}, "", path);
        handleLocation();
    }
};
  
const routes = {
	404: "/html/404.html",
	"/": "/html/index.html",
	"/settings": "/html/settings.html",
	"/profile": "/html/profile.html"
};

const handleLocation = async () => {
	const path = window.location.pathname;
	console.log(path);
	const route = routes[path] || routes[404];
	const html = await fetch(route).then((data) => data.text());
	document.getElementById("main-page").innerHTML = html;
	document.body.setAttribute('data-show-navbar', path === '/');
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
  