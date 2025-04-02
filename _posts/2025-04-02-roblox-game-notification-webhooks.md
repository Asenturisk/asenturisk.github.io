---
layout: post
title: Roblox Game Notifications via Discord Webhooks
tags:
  - jekyll
  - dactl
description: >
    Find out how to receive instant notifs whenever someone joins your game!
hero: https://source.unsplash.com/collection/145103/
overlay: purple
published: true
---

## Someone joins your game
This needs to be placed inside a `Script`:
```lua
local HttpService = game:GetService("HttpService")
local webhookUrl = "https://discord.com/api/webhooks/REPLACE-THIS-WITH-YOUR-OWN-WEBHOOK-URL"

local function sendDiscordWebhook(player, xp, timePlayed, kills)
	local profileLink = "https://www.roblox.com/users/" .. player.UserId .. "/profile"

	local embedData = {
		["title"] = player.Name .. " has joined the game! 🎮",
		["color"] = 16753920,  -- Orange color
		["fields"] = {
			{ ["name"] = "Username", ["value"] = "[" .. player.Name .. "](" .. profileLink .. ")", ["inline"] = true },
			{ ["name"] = "User ID", ["value"] = tostring(player.UserId), ["inline"] = true },
			{ ["name"] = "XP", ["value"] = tonumber(xp), ["inline"] = true },
			{ ["name"] = "Time Played", ["value"] = tonumber(timePlayed), ["inline"] = true },
			{ ["name"] = "Kills", ["value"] = tostring(kills), ["inline"] = true },
		},
		["footer"] = { ["text"] = "Game Notification", ["icon_url"] = "https://www.roblox.com/favicon.ico" },
		["timestamp"] = os.date("!%Y-%m-%dT%H:%M:%SZ")  -- ISO 8601 format timestamp
	}

	local payload = HttpService:JSONEncode({ embeds = { embedData } })

	pcall(function()
		HttpService:PostAsync(webhookUrl, payload, Enum.HttpContentType.ApplicationJson)
	end)
end

game.Players.PlayerAdded:Connect(function(player)
	-- Send webhook notification
	sendDiscordWebhook(player, initialXP, initialPlaytime, initialKills)
end)
```

## Someone reports/logs a bug

```lua
local function onPlayerChatted(player, message)
	local command, argument = message:match("^/(%w+)%s*(.*)")
	
	if command == "log" then
		if argument ~= "" then
			local webhookURL = "https://discord.com/api/webhooks/REPLACE-THIS-WITH-YOUR-OWN-WEBHOOK-URL" 
			local httpService = game:GetService("HttpService")
			local profileLink = "https://www.roblox.com/users/" .. player.UserId .. "/profile"

			local embedData = {
				["title"] = "📝 Log Entry",
				["color"] = 16753920,  -- Orange color
				["fields"] = {
					{ ["name"] = "Player", ["value"] = "[" .. player.Name .. "](" .. profileLink .. ")", ["inline"] = true },
					{ ["name"] = "User ID", ["value"] = tostring(player.UserId), ["inline"] = true },
					{ ["name"] = "Message", ["value"] = "" .. argument }  -- Big text emphasis
				},
				["footer"] = { ["text"] = "Game Log System", ["icon_url"] = "https://www.roblox.com/favicon.ico" },
				["timestamp"] = os.date("!%Y-%m-%dT%H:%M:%SZ")  -- ISO 8601 format timestamp
			}

			local payload = httpService:JSONEncode({ embeds = { embedData } })

			local success, response = pcall(function()
				return httpService:PostAsync(webhookURL, payload, Enum.HttpContentType.ApplicationJson)
			end)
		end
	end
end
```
