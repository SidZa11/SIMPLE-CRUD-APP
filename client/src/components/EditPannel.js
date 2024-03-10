import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import swal from 'sweetalert';

const EditPannel = (props) => {
    console.log(props.unique)
const [open, setOpen] = useState(true)

const updateProduct = async () => {
const form = document.getElementById('updateForm');
const formData = new FormData(form);
if ( formData.get('name') == "" || formData.get('quantity') == '' || formData.get('price') == '') {
swal("Wrong!", "Please Enter Fields!", "error");
} else {

// Parse quantity and price as numbers
const quantity = parseInt(formData.get('quantity'));
const price = parseInt(formData.get('price'));

try {
const response = await fetch('http://localhost:5000/api/products/' + props.unique._id, {
method: 'PUT',
mode: 'cors',
body: JSON.stringify({ name: formData.get('name'), quantity, price }), // Use parsed values
headers: {
'Content-Type': 'application/json'
}
});

if (!response.ok) {
throw new Error('Network response was not ok');
}

const data = await response.json();
await swal("Good job!", "A New Product is Updated!", "success");
setOpen(true)
window.location.reload();

} catch (error) {
console.error('There was a problem with the form submission:', error);
swal("wrong!", "Enter Again!", "error");
}
}
};

function handleCancel() {
    setOpen(true)
    window.location.reload()
}

const cancelButtonRef = useRef(null)

return (
<Transition.Root show={props.open} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child as={Fragment} enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <Dialog.Panel
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div
                                    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900">
                                        Deactivate account
                                    </Dialog.Title>
                                    <form id='updateForm'>
                                        <div>
                                            <label htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                </div>
                                                <input type="text" name="name" id="name" defaultValue={props.unique.name}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Sandwich" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="quantity"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Quantity
                                            </label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                </div>
                                                <input type="number" name="quantity" id="quantity" defaultValue={props.unique.quantity}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="2" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="price"
                                                className="block text-sm font-medium leading-6 text-gray-900">
                                                Price
                                            </label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    {/* <span className="text-gray-500 sm:text-sm">$</span> */}
                                                </div>
                                                <input type="number" name="price" id="price" defaultValue={props.unique.price}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="400" />
                                            </div>
                                        </div>
                                    </form>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={()=> updateProduct()}
                                            >
                                            Update Product
                                        </button>
                                        <button type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={()=> handleCancel()}
                                            ref={cancelButtonRef}
                                            >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
</Transition.Root>
)
}

export default EditPannel
