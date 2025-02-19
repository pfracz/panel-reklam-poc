import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center">
            <article className="flex flex-col items-center">
                <h1 className="text-xl">Błąd 404</h1>
                <p className="mt-2 font-bold">Podany adres nie istnieje</p>

                <div className="mt-20">
                    <Button component={Link} to="/" variant="contained">
                        Przejdź do strony głównej
                    </Button>
                </div>
            </article>
        </section>
    );
}

export default NotFoundPage;
