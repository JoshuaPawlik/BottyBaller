module.exports = {
    commands: 'jojo',
    description: "This is a jojo command",
    execute(message, args){
        message.channel.send('https://animeheaven.ru/detail/jojo-no-kimyou-na-bouken-ougon-no-kaze-dub?__cf_chl_jschl_tk__=7ddbab29ba3e5e63556572057025ff7fbb066cb7-1598146110-0-AdlgwGoYWtMA5-0sNpsHGjAPF5Tme9NWUiHMUP9HjbJTMDgOVb5sRrqDs3CkKAHsgujbRu7qkfSSlpvq27xr86Rm_U-DObuMK0qaoVJmHgH1WXIKsZIKUmHx_eUXP6hvAoy1f76esTSaWEfWC_swtF2veU9VIvBKbVsP5ubNMFVkyqd5lqhR7zpQH7x-synLX9yp2WsvrBGgUAmzbRXu23Ikui7rqUMB7mg3veRQXB-m3a8GJPnhUNHifYrZcCW5LWuH60LtHy1bbN0SuWHxUlSTljHK5UAMlCX6rZ6agppGmPFBmHhDT0DS183FMX8i-c5l5Om9QeWCHHKz1mximDU')
        console.log('message ---->', message);
    }
}
