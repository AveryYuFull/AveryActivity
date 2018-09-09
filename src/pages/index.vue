<template>
  <div class="_content">
      <activity></activity>
  </div>
</template>

<script>
import Activity from './activity/Activity';

export default {
    computed: {
        ...Vuex.mapState('cashier', {
            jsessionid: 'jsessionid'
        })
    },
    data() {
        return {
            sessionid: ''
        };
    },
    components: {
        Activity
    },
    async created() {
        // this.$http.post('/ActivitySetting/Activity/GetActivityList', {
        //     apiServer: 'apiServer',
        //     isLoading: true
        // }).subscribe(data => {
        //     // console.log(data);
        // });
        // this.$http.get('/4dc40848513cedc8d946f1ae.html', {
        //     apiServer: 'apiServer2',
        //     isLoading: true
        // }).subscribe(data => {
        //     // console.log(data);
        // });
    // const token = this.options.token
    // const channel = this.options.channel
    // const code = this.options.code
    // const support = this.options.support || ''
    // await getSession(token).then((res) => {
    //   if (res && res.ok) {
    //     tuhu.store.commit('cashier/setJsessionid', res.headers.get('SESSIONID'))
    //     tuhu.localStorage.setItem('session', res.headers.get('SESSIONID'))
    //     tuhu.localStorage.setItem('support', support)
    //     let pathname = ''
    //     if (channel === 'bapp') {
    //       pathname = 'receivable'
    //     } else if (channel === 'web') {
    //       pathname = 'webcashier'
    //     } else if (channel === 'general' || channel === 'shop') {
    //       pathname = 'sdkcashier'
    //     } else {
    //       pathname = 'wxcashier'
    //     }
    //     tuhu.redirectTo({
    //       url: `/pages/cashier/${pathname}`,
    //       data: {
    //         code: code
    //       },
    //       query: {
    //         channel: channel
    //       }
    //     })
    //   } else {
    //     tuhu.alert('收银台服务异常', () => {
    //       myutil.toError()
    //     })
    //   }
    // }).catch((e) => {
    //   myutil.catchError(e)
    // })
    }
};
</script>
