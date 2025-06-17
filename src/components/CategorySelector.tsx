import { useExpenseCategories } from '../hooks/useExpenseCategories';

interface CategorySelectorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    required?: boolean;
    includeAllOption?: boolean;
}

export function CategorySelector({
    value,
    onChange,
    className = '',
    required = false,
    includeAllOption = false
}: CategorySelectorProps) {
    const { categories, loading, error } = useExpenseCategories();

    return (
        <div>
            {error && (
                <div className="mb-2 text-sm text-red-600">
                    Error al cargar las categorías: {error}
                </div>
            )}
            <select
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={loading}
                required={required}
            >
                <option value="">
                    {loading ? 'Cargando categorías...' : 'Selecciona una categoría'}
                </option>
                {includeAllOption && (
                    <option value="all">Todas las categorías</option>
                )}
                {categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                        {category.name}
                    </option>
                ))}
            </select>
            {loading && (
                <div className="mt-1 text-sm text-gray-500">
                    Cargando categorías...
                </div>
            )}
        </div>
    );
}
