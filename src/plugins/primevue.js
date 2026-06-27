import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'

// Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Password from 'primevue/password'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import ToggleSwitch from 'primevue/toggleswitch'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import Dialog from 'primevue/dialog'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Breadcrumb from 'primevue/breadcrumb'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Popover from 'primevue/popover'
import Drawer from 'primevue/drawer'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast'
import Timeline from 'primevue/timeline'
import Chart from 'primevue/chart'
import FileUpload from 'primevue/fileupload'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'
import Tooltip from 'primevue/tooltip'
import DatePicker from 'primevue/datepicker'

const ScalifyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
  components: {
    button: {
      borderRadius: '8px',
    },
    inputtext: {
      borderRadius: '8px',
    },
    select: {
      borderRadius: '8px',
    },
    dialog: {
      borderRadius: '16px',
    },
    card: {
      borderRadius: '12px',
    },
  },
})

export function setupPrimeVue(app) {
  app.use(PrimeVue, {
    theme: {
      preset: ScalifyPreset,
      options: {
        darkModeSelector: '.dark-mode',
        cssLayer: false,
      },
    },
    ripple: true,
  })

  app.use(ToastService)
  app.use(ConfirmationService)
  app.use(DialogService)

  // Global component registration
  app.component('Button', Button)
  app.component('InputText', InputText)
  app.component('InputNumber', InputNumber)
  app.component('Password', Password)
  app.component('Textarea', Textarea)
  app.component('Select', Select)
  app.component('MultiSelect', MultiSelect)
  app.component('Checkbox', Checkbox)
  app.component('RadioButton', RadioButton)
  app.component('ToggleSwitch', ToggleSwitch)
  app.component('InputGroup', InputGroup)
  app.component('InputGroupAddon', InputGroupAddon)
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Paginator', Paginator)
  app.component('Dialog', Dialog)
  app.component('DynamicDialog', DynamicDialog)
  app.component('ConfirmDialog', ConfirmDialog)
  app.component('Card', Card)
  app.component('Panel', Panel)
  app.component('Avatar', Avatar)
  app.component('AvatarGroup', AvatarGroup)
  app.component('Badge', Badge)
  app.component('Tag', Tag)
  app.component('Chip', Chip)
  app.component('Divider', Divider)
  app.component('Skeleton', Skeleton)
  app.component('ProgressBar', ProgressBar)
  app.component('ProgressSpinner', ProgressSpinner)
  app.component('Breadcrumb', Breadcrumb)
  app.component('Menu', Menu)
  app.component('Menubar', Menubar)
  app.component('Popover', Popover)
  app.component('Drawer', Drawer)
  app.component('Tabs', Tabs)
  app.component('TabList', TabList)
  app.component('Tab', Tab)
  app.component('TabPanels', TabPanels)
  app.component('TabPanel', TabPanel)
  app.component('Toast', Toast)
  app.component('Timeline', Timeline)
  app.component('Chart', Chart)
  app.component('FileUpload', FileUpload)
  app.component('IconField', IconField)
  app.component('InputIcon', InputIcon)
  app.component('Message', Message)
  app.component('InlineMessage', InlineMessage)
  app.component('DatePicker', DatePicker)

  app.directive('tooltip', Tooltip)
}
