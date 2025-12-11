'use client';

import { useState, useEffect } from 'react';
import { fetchRecordsAction, fetchTablesAction, deleteRecordAction } from '../actions';
import { AirtableTable, AirtableRecord } from '@/lib/airtable-admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AirtableBrowser() {
    const [tables, setTables] = useState<AirtableTable[]>([]);
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const [records, setRecords] = useState<AirtableRecord[]>([]);
    const [loadingTables, setLoadingTables] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        async function loadTables() {
            try {
                const data = await fetchTablesAction();
                setTables(data);
                if (data.length > 0) {
                    setSelectedTable(data[0].name);
                }
            } catch (error) {
                console.error('Failed to load tables', error);
                toast.error('Failed to load tables');
            } finally {
                setLoadingTables(false);
            }
        }
        loadTables();
    }, []);

    useEffect(() => {
        if (!selectedTable) return;

        async function loadRecords() {
            setLoadingRecords(true);
            try {
                // selectedTable is checked above, but TypeScript might need reassurance or we just pass it safely
                const data = await fetchRecordsAction(selectedTable!);
                setRecords(data);
            } catch (error) {
                console.error('Failed to load records', error);
                setRecords([]);
                toast.error('Failed to load records');
            } finally {
                setLoadingRecords(false);
            }
        }
        loadRecords();
    }, [selectedTable]);

    const handleDelete = async (recordId: string) => {
        if (!selectedTable) return;
        if (!confirm('Are you sure you want to delete this record?')) return;

        setDeletingId(recordId);
        try {
            await deleteRecordAction(selectedTable, recordId);
            setRecords(prev => prev.filter(r => r.id !== recordId));
            toast.success('Record deleted successfully');
        } catch (error) {
            console.error('Failed to delete record', error);
            toast.error('Failed to delete record');
        } finally {
            setDeletingId(null);
        }
    };

    // Get the selected table object to access its fields
    const selectedTableData = tables.find(t => t.name === selectedTable);

    // Helper to get field keys: prefer schema, fallback to record keys
    const getFieldKeys = () => {
        if (selectedTableData?.fields && selectedTableData.fields.length > 0) {
            return selectedTableData.fields.map(f => f.name);
        }

        // Fallback if no schema available
        const keys = new Set<string>();
        records.forEach(r => {
            Object.keys(r.fields).forEach(k => keys.add(k));
        });
        return Array.from(keys).sort();
    };

    const fieldKeys = getFieldKeys();

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-2 border-r pr-4">
                <h2 className="text-lg font-semibold mb-4">Tables</h2>
                {loadingTables ? (
                    <div className="text-sm text-muted-foreground">Loading tables...</div>
                ) : (
                    tables.map((table) => (
                        <Button
                            key={table.name}
                            variant={selectedTable === table.name ? "default" : "ghost"}
                            className="justify-start"
                            onClick={() => setSelectedTable(table.name)}
                        >
                            {table.name}
                        </Button>
                    ))
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {selectedTable ? selectedTable : 'Select a table'}
                    </h2>
                    <div className="text-sm text-muted-foreground">
                        {records.length} records found
                    </div>
                </div>

                <Card className="flex-1 overflow-hidden flex flex-col">
                    <CardContent className="p-0 flex-1 overflow-auto">
                        {loadingRecords ? (
                            <div className="p-8 text-center text-muted-foreground">Loading records...</div>
                        ) : (
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">Actions</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                            {fieldKeys.map(key => (
                                                <th key={key} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap">
                                                    {key}
                                                </th>
                                            ))}
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap">Created Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {records.length === 0 ? (
                                            <tr>
                                                <td colSpan={fieldKeys.length + 3} className="p-8 text-center text-muted-foreground">
                                                    No records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            records.map((record) => (
                                                <tr key={record.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <td className="p-4 align-middle">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleDelete(record.id)}
                                                            disabled={deletingId === record.id}
                                                        >
                                                            {deletingId === record.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </td>
                                                    <td className="p-4 align-middle font-mono text-xs text-muted-foreground">{record.id}</td>
                                                    {fieldKeys.map(key => (
                                                        <td key={key} className="p-4 align-middle whitespace-nowrap">
                                                            {renderCellValue(record.fields[key])}
                                                        </td>
                                                    ))}
                                                    <td className="p-4 align-middle whitespace-nowrap text-muted-foreground">
                                                        {new Date(record.createdTime).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function renderCellValue(value: any): React.ReactNode {
    if (value === null || value === undefined) return <span className="text-muted-foreground/30">-</span>;

    if (Array.isArray(value)) {
        return (
            <div className="flex flex-wrap gap-1">
                {value.map((v, i) => (
                    <span key={i} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {String(v)}
                    </span>
                ))}
            </div>
        );
    }

    if (typeof value === 'boolean') {
        return value ? (
            <span className="text-green-600 font-medium">Yes</span>
        ) : (
            <span className="text-red-600 font-medium">No</span>
        );
    }

    if (typeof value === 'object') {
        return <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>;
    }

    return String(value);
}
