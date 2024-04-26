import { Spinner, Button } from 'react-bootstrap';
function LoadingSpinner() {
    return (
        <div className="loading-popular">
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
    );
}
export { LoadingSpinner };
