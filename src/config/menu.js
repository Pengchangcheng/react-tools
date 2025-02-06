import JsonFormatter from '../components/JsonFormatter/JsonFormatter';
import TextProcessor from '../components/TextProcessor/TextProcessor';
import SqlFormatter from '../components/SqlFormatter/SqlFormatter';
import Settings from '../components/Settings/Settings';
import QrCode from '../components/QrCode/QrCode';

export const getMenuConfig = (t) => [
    {
        id: 'qr-code',
        label: t('qrCode'),
        component: QrCode
    },
    {
        id: 'json-formatter',
        label: t('jsonFormatter'),
        component: JsonFormatter
    },
    {
        id: 'text-processor',
        label: t('textProcessor'),
        component: TextProcessor
    },
    {
        id: 'sql-formatter',
        label: t('sqlFormatter'),
        component: SqlFormatter
    },
    {
        id: 'settings',
        label: t('settings'),
        component: Settings
    }
];