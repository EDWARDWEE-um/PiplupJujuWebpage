import Link from "next/link"

interface CategorySidebarProps {
  collections?: any[]
}

export default function CategorySidebar({ collections = [] }: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/products/singles" className="text-sm hover:text-primary">
              Single Cards
            </Link>
          </li>
          <li>
            <Link href="/products/sealed" className="text-sm hover:text-primary">
              Sealed Products
            </Link>
          </li>
          <li>
            <Link href="/products/slabs" className="text-sm hover:text-primary">
              Slabs
            </Link>
          </li>
        </ul>
      </div>

      {collections && collections.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Collections</h3>
          <ul className="space-y-2">
            {collections.map((collection) => (
              <li key={collection._id}>
                <Link
                  href={`/collection/${collection.slug || collection.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm hover:text-primary"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <ul className="space-y-2">
          <li>
            <Link href="?price=under-10" className="text-sm hover:text-primary">
              Under $10
            </Link>
          </li>
          <li>
            <Link href="?price=10-50" className="text-sm hover:text-primary">
              $10 - $50
            </Link>
          </li>
          <li>
            <Link href="?price=50-100" className="text-sm hover:text-primary">
              $50 - $100
            </Link>
          </li>
          <li>
            <Link href="?price=over-100" className="text-sm hover:text-primary">
              Over $100
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium mb-2">Rarity</h3>
        <ul className="space-y-2">
          <li>
            <Link href="?rarity=common" className="text-sm hover:text-primary">
              Common
            </Link>
          </li>
          <li>
            <Link href="?rarity=uncommon" className="text-sm hover:text-primary">
              Uncommon
            </Link>
          </li>
          <li>
            <Link href="?rarity=rare" className="text-sm hover:text-primary">
              Rare
            </Link>
          </li>
          <li>
            <Link href="?rarity=ultra-rare" className="text-sm hover:text-primary">
              Ultra Rare
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
