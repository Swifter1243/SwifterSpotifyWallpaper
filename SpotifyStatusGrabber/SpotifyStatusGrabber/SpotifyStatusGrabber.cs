using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SpotifyStatusGrabber
{
	public partial class SpotifyStatusGrabber : Form
	{
		private NotifyIcon notifyIcon;

		public SpotifyStatusGrabber()
		{
			InitializeComponent();

			// Minimize the main window.
			WindowState = FormWindowState.Minimized;

			// Hide the form from the taskbar
			ShowInTaskbar = false; // Make sure the form doesn't show in the taskbar
			Load += Grabber_Load; // Handle the Load event

			// Initialize NotifyIcon
			notifyIcon = new NotifyIcon();
			notifyIcon.Icon = SystemIcons.Application; // Set an icon
			notifyIcon.Visible = true; // Make the icon visible

			// Optional: Add a context menu
			SetupContextMenu();
		}

		private void SetupContextMenu()
		{
			ContextMenuStrip contextMenu = new ContextMenuStrip();

			ToolStripMenuItem exitMenuItem = new ToolStripMenuItem("Exit");
			exitMenuItem.Click += (object sender, EventArgs e) => Application.Exit();
			contextMenu.Items.Add(exitMenuItem);

			notifyIcon.ContextMenuStrip = contextMenu;
		}

		private void Grabber_Load(object sender, EventArgs e)
		{
			// Hide the form from the taskbar
			ShowInTaskbar = false;
			FormBorderStyle = FormBorderStyle.None; // Optional: Remove border (not necessary for taskbar)
		}
	}
}
