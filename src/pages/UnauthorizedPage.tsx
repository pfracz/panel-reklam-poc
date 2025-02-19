import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function UnauthorizedPage() {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center">
            <article className="flex flex-col items-center">
                <h1 className="text-xl">Błąd 401</h1>
                <p className="mt-2 font-bold">Odmowa dostępu</p>

                <div className="mt-20">
                    <Button component={Link} to="/" variant="contained">
                        Przejdź do strony głównej
                    </Button>
                </div>
            </article>
        </section>
    );
}

export default UnauthorizedPage;
