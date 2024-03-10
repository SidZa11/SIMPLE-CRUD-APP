import React from 'react'
import swal from 'sweetalert'
async function submitForm() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    if ( formData.get('name') == "" || formData.get('quantity') == '' || formData.get('price') == '') {
        swal("Wrong!", "Please Enter Fields!", "error");
    } else {

    // Parse quantity and price as numbers
    const quantity = parseInt(formData.get('quantity'));
    const price = parseInt(formData.get('price'));

    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
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
        await swal("Good job!", "A New Product is Created!", "success");
        window.location.reload();

    } catch (error) {
        console.error('There was a problem with the form submission:', error);
        swal("Good job!", "You clicked the button!", "error");
    }
}
}
const InsertProduct = () => {
return (
<form id='myForm'>
    <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
            <h1 className='text-center text-2xl tracking-wide underline mb-10 font-bold'>Enter Product Detail</h1>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Product Name
                    </label>
                    <div className="mt-2">
                        <div
                            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="text" name="name" id="name" autoComplete="name" required
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Sandwich" />
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                        Quantity
                    </label>
                    <div className="mt-2">
                        <input type="number" name="quantity" id="quantity" placeholder='2' required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Price
                    </label>
                    <div className="mt-2">
                        <input type="number" name="price" id="price" placeholder='400' required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

            </div>
        </div>


    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
        </button>
        <button type="button" onClick={() => submitForm()}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create Product
        </button>
    </div>
</form>
)
}

export default InsertProduct
