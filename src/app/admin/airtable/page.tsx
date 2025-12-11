import AirtableBrowser from './components/AirtableBrowser';

export default function AirtableAdminPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Airtable Browser</h1>
            <p className="text-muted-foreground mb-8">
                View and explore data directly from your connected Airtable base.
            </p>
            <AirtableBrowser />
        </div>
    );
}
