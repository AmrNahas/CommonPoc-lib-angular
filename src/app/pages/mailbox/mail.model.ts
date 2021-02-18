export class Mail {

        public id: number; // refer to det
        public ticketId: number;
        public sender: string;
        public senderPhoto: string;
        public senderMail: string;
        public subject: string;
        public date: number;
        public body: string;
        public unread: number;
        public sent: number;
        public starred: number;
        public draft: number;
        public trash: number;
        public ticketTypeId: number;
        public selected: boolean;
        public attachments: [];
        public  ticketScNumber :string;
        public   typeNameAr: string;
        public   typeNameNameEn: string;
        public  partyNameAr :string;
        public  partyNameEn :string;
        public status :number;    // refer to  mail status parent
    
}
