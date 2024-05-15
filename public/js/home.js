const params = new URLSearchParams(window.location.search);
const noAuth = params.get("noAuth");

if (noAuth) {
    let noauthModal = new bootstrap.Modal("#noauthModal");
    noauthModal.show();
}
