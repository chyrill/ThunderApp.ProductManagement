import PurchaseOrder from '../modules/purchaseorder/purchaseorder.model';
import Deliverable from '../modules/deliverable/deliverable.model';


export default function PurchaseOrderService {
    try {
        console.log(`
            =========================================================
            Purchase Order Service started ......
            =========================================================
            `)
    } catch (e) {
        console.log(e)
    }
}

function Processor() {
    var purchaseOrderItems = awiat PurchaseOrder.find({ Status: 'New' });

    for (let i in purchaseOrderItems) {
        var po = purchaseOrderItems[i];

        let payload = {
            PuchaserOrderId: po._id,
            Status: 'New',
            Items: [],
            Context: po.Context
        }

        for (let a in po.Items) {
            var poItem = po.Items[a]

            let item = {
                _id: poItem._id,
                Name: poItem.Name,
                Quantity: poItem.Quantity,
                SerialNo: [],
                DeliveryReciept: ''
            }

            payload.Items.push(item);
        }

        po.Status = 'Processing';

        await PurchaseOrder.findOneAndUpdate({ _id: po._id }, po, { Upsert: true, strict: false });

        await Deliverable.create(payload);
    }
}