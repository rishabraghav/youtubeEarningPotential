const Header = () => {
    return (
        <header className="bg-black px-36 py-4 max-sm:p-2 flex justify-between">
        <div className='flex items-center'>
          <img width={22} src='https://s3-alpha-sig.figma.com/img/4b3c/df87/c92184c60d792747604fb481e0becb60?Expires=1698624000&Signature=GsTHqkyHgaZFgXYEGaH~C7SIhYh37Dni5XrvWsTVnlU33CeuTfS7xjarPjw-4-l2eVxLR0SIC3vTyLKgE0H-d3uFEeyDOnKnQRz5l9PZS26YAWehFy2GGfmViOuM-vqUuL~TX5cNQHR~1mpyuIqKC~cWmk0mcM6-OXQ-rNUr88l1Mc6XD8aAlYRcRz1TwmHiOjfrBayIldnWTZ-pQyhjWY5CxjiteJ0A5GiSqMcZx6b~9M~JokLFs1-zwSyKClrXqVgK3W2MiWml082vIL~o1mgA9HWIe2geIFIIcHApzvMv8W9c~vUmbyGcB0I5OTi~MqOlOomLlVPp3Pj2-0KpPg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' />
          <p className='text-white w-[116px] font-semibold text-2xl flex justify-center items-center'>anchors</p>
        </div>
        <div className='flex items-center px-[24px] py-[10px] space-x-2 border rounded-[40px] border-white border-opacity-50'>
          <img width="15" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/phone--v1.png" alt="phone--v1" />
          <p className='text-white'>Request a call back</p>
        </div>
      </header>
    )
}

export default Header;