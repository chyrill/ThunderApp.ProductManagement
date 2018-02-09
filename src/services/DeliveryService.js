import Delivery from './modules/delivery/delivery.model';
import PurchaseOrder from './modules/purchaseorder/purchaseorder.model';

export default function DeliveryService {
    try {
        console.log(`
			=================================================
			Delivery Service started .......
			=================================================
			`);

        setInterval()
    } catch (e) {

    }
}

function Processor() {

    var deliverySearchItems = await Delivery.find({ Status: 'New' });

    for (let item in deliverySearchItems) {
        var deliveryItem = deliverySearchItems[item];

        var getPurchaseOrderList = await PurchaseOrder.find({ Status: { $ne: 'Processed' }, Context: deliveryItem.Context });

    }
}