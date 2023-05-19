/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHashnode } from '@fortawesome/free-brands-svg-icons';

/* import specific icons */
import { faBars, faBox, faEnvelope, faLock, faMoneyBill, faPenToSquare, faSignature, faSquarePlus, faStore, faTrash, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faUserSecret, 
    faUser,
    faEnvelope,
    faLock,
    faStore,
    faBox,
    faBars,
    faTrash,
    faPenToSquare,
    faHashnode,
    faSignature,
    faSquarePlus,
    faMoneyBill
);