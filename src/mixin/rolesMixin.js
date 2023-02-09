export default {
  methods: {
    rolesBTN(val) {
      let roles = this.$store.getters.roles.points.includes(val)
      return roles
    }
  }
}
