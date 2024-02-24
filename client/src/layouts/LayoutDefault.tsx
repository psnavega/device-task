export function LayoutDefault() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <footer className="footer">
            <div>Patrick Navega - <a href="https://github.com/psnavega">Github</a></div>
            <div>{currentDate}</div>
        </footer>
    );
}