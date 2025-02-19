import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import fetchQuote from '../helpers/fetchQuote';
import { checkPassword, logIn } from '../helpers/auth';
import Quote from '../types/Quote';

function LandingPage() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const [redirectToPanel, setRedirectToPanel] = useState(false);
    const [redirectToUnathorized, setRedirectToUnathorized] = useState(false);

    useEffect(() => {
        async function getQuote() {
            const data: Quote[] = await fetchQuote();
            setQuote(data[0].quote);
            setAuthor(data[0].author);
        }

        if (!quote) getQuote();
    }, [quote]);

    function login() {
        const password = prompt('Podaj hasło: ');

        if (checkPassword(password || '')) {
            logIn();
            setRedirectToPanel(true);
        } else setRedirectToUnathorized(true);
    }

    if (redirectToPanel) return <Redirect to="/advertisements" />;
    if (redirectToUnathorized) return <Redirect to="/unauthorized" />;

    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center px-5">
            <article className="max-w-[700px] flex flex-col items-center">
                <h1 className="text-center w-full">{quote ? `"${quote}"` : 'Pobieranie cytatu...'}</h1>
                <p className="mt-2 font-bold">{author}</p>

                <div className="mt-20">
                    <Button onClick={login} variant="contained">
                        Przejdź do panelu
                    </Button>
                </div>
            </article>
        </section>
    );
}

export default LandingPage;
