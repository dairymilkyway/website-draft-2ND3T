<div class="flex h-screen flex-col justify-between border-e bg-white">
  <div class="px-4 py-6">
    <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
      Logo
    </span>

    <ul class="mt-6 space-y-1">
  <li>
    <a
      href="{{route('brand.index')}}"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Brand
    </a>
  </li>

  <li>
    <a
      href="{{route('product.index')}}"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Product
    </a>
  </li>

  <li>
    <a
      href="{{route('supplier.index')}}"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Supplier
    </a>
  </li>

  <li>
    <a
      href="{{route('customer.index')}}"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Customer
    </a>
  </li>

  <li>
    <a
      href="{{route('order.index')}}"
      class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    >
      Order
    </a>
  </li>

    </ul>
  </div>

  <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <div class="p-4 hover:bg-gray-50">
      <form action="#">
        <button
          type="submit"
          class="w-full flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </form>
    </div>

    <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        class="size-10 rounded-full object-cover"
      />

      <div>
        <p class="text-xs">
          <strong class="block font-medium">Eric Frusciante</strong>

          <span> eric@frusciante.com </span>
        </p>
      </div>
    </a>
  </div>
</div>
