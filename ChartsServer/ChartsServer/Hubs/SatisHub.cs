using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChartsServer.Hubs
{
    public class SatisHub:Hub
    {
        public async Task SendMessageAsync()
        {
            await Clients.All.SendAsync("receiveMessage", "Merhaba");
        }
    }
}
