class NotifyService {
    static alert = null;

    static register(ref) {
        this.alert = ref;
    }

    static notify({ title, message, type, duration }) {
        setTimeout(() => {
            requestAnimationFrame(() => {
                if (this.alert) {
                    this.alert.alertWithType(type, title, message);
                }
            });
        }, 100);
    }
}

export default NotifyService;