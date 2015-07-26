"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, String
from xblock.fragment import Fragment


class Web3dXBlock(XBlock):
    """
    A web 3D Xblock.
    """

    display_name = String(display_name="Display name", default="web3d", scope=Scope.settings,
                          help="This name appears in the horizontal navigation at the top of the page.")
    obj = String(default=None, scope=Scope.content, help="URL for obj file.")
    mtl = String(default=None, scope=Scope.content, help="URL for mtl file.")

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the Web3dXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/web3d.html")
        frag = Fragment(
            html.format(obj=self.obj or self.runtime.local_resource_url(self, "public/skylab/skylab_carbajal.obj"),
                        mtl=self.mtl or self.runtime.local_resource_url(self, "public/skylab/skylab_carbajal.mtl")))
        frag.add_javascript(self.resource_string("static/js/src/web3d.js"))
        frag.add_javascript(self.resource_string("static/js/lib/three.min.js"))
        frag.add_javascript(self.resource_string("static/js/lib/loaders/DDSLoader.js"))
        frag.add_javascript(self.resource_string("static/js/lib/loaders/MTLLoader.js"))
        frag.add_javascript(self.resource_string("static/js/lib/loaders/OBJMTLLoader.js"))
        frag.add_javascript(self.resource_string("static/js/lib/controls/TrackballControls.js"))
        frag.initialize_js('Web3dXBlock')
        return frag

    def studio_view(self, context=None):
        html = self.resource_string("static/html/web3d_studio.html")
        frag = Fragment(
            html.format(obj=self.obj,
                        mtl=self.mtl))
        frag.add_javascript(self.resource_string("static/js/src/web3d_studio.js"))
        frag.initialize_js("Web3dXBlockStudio")
        return frag

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        self.obj = data.get('obj')
        self.mtl = data.get('mtl')
        return {'result': 'success'}

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("Web3dXBlock",
             """<vertical_demo>
                <web3d/>
                </vertical_demo>
             """),
        ]
