import { View, Text } from 'react-native'

export default function OfferPrice({ offer, styles }) {
  if (!offer) return null

  switch (offer.type) {
    case 'product':
      return (
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>R$ {offer.original_price.toFixed(2)}</Text>
          <Text style={styles.discountPrice}>R$ {offer.discount_price.toFixed(2)}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>-{offer.discount}%</Text>
          </View>
        </View>
      )

    case 'coupon':
      return (
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>{offer.value}% OFF</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>CUPOM</Text>
          </View>
        </View>
      )

    case 'gift':
      return (
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>GRÁTIS 🎁</Text>
        </View>
      )

    default:
      return null
  }
}