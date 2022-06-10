import { clearCookies } from "./storage.service";

export default function logOut() {
    clearCookies()
    window.location.reload('/login')
    // let iframeWindow = document.getElementById("auth-site").contentWindow;
    // iframeWindow.postMessage({
    //     method: 'REMOVE_TOKEN'
    // }, "*");
}